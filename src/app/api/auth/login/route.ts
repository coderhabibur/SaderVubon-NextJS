import { NextRequest, NextResponse } from "next/server";
import { verifyWordPressCredentials, findCustomer, formatCustomer, getCustomerById } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !username.trim()) {
      return NextResponse.json({ success: false, error: "Please enter your Email or Mobile Number." }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ success: false, error: "Please enter your password." }, { status: 400 });
    }

    const cleanInput = username.trim();

    // 1. Try finding customer in WooCommerce to get their actual username/email
    let customerRecord = await findCustomer(cleanInput);

    let authIdentifier = cleanInput;
    if (customerRecord) {
      // Use customer's email or username for WP authentication
      authIdentifier = customerRecord.email || customerRecord.username || cleanInput;
    }

    // 2. Verify credentials via WordPress XML-RPC
    const authResult = await verifyWordPressCredentials(authIdentifier, password);

    // If initial check failed and input was phone, try user's username if different
    if (!authResult.success && customerRecord && customerRecord.username && customerRecord.username !== authIdentifier) {
      const retryResult = await verifyWordPressCredentials(customerRecord.username, password);
      if (retryResult.success) {
        authResult.success = true;
      }
    }

    if (!authResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid login credentials. Please check your email/mobile and password.",
        },
        { status: 401 }
      );
    }

    // 3. If customer record wasn't found before, fetch it now by verified email/username
    if (!customerRecord) {
      customerRecord = await findCustomer(cleanInput);
    }

    const userProfile = customerRecord
      ? formatCustomer(customerRecord)
      : {
          id: 0,
          name: cleanInput.split("@")[0],
          firstName: cleanInput.split("@")[0],
          lastName: "",
          email: cleanInput.includes("@") ? cleanInput : "",
          phone: !cleanInput.includes("@") ? cleanInput : "",
          address: "",
          city: "Dhaka",
        };

    return NextResponse.json({
      success: true,
      message: "Successfully logged in!",
      user: userProfile,
    });
  } catch (err: any) {
    console.error("Login API error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to log in." }, { status: 500 });
  }
}
