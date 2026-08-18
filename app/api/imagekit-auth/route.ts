import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY! as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY! as string,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT! as string,
});

export async function GET() {
  try {
    const authenticationParameters =
      await imagekit.getAuthenticationParameters();
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get authentication parameters" },
      { status: 500 },
    );
  }
}
