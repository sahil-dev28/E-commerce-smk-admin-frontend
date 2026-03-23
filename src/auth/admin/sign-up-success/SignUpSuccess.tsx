import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdVerified } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { FieldError, FieldSeparator } from "@/components/ui/field";
import { useVerifyEmail } from "@/hooks/auth/admin/useVerifyEmail";

export default function SignUpSuccessPage() {
  const { isPending, error } = useVerifyEmail();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  return (
    <Card className="w-100 max-w-lg justify-center mx-auto mt-20">
      <MdVerified className="size-10 mt-4 justify-center mx-auto" />
      <CardHeader className="">
        <CardTitle className="text-xl justify-center mx-auto">
          Your'e ready to go!
        </CardTitle>
        <CardTitle className="text-xl justify-center mx-auto">
          Check your email to begin.
        </CardTitle>
        <CardDescription className="justify-center mx-auto mt-2.5 font-extralight text-foreground">
          <p className="justify-center mx-auto">
            Please check your email
            <span className="font-black"> '{email}'</span> and
            <span className=""> click on the</span>
            <span className="font-black"> 'link'</span> to complete your sign
            up.
          </p>
        </CardDescription>
      </CardHeader>
      <FieldSeparator className="mt-0"></FieldSeparator>

      {isPending && (
        <p className="text-center text-sm text-muted">Please wait…</p>
      )}

      {error && (
        <FieldError className="text-center mt-2">
          Invalid or expired verification link.
        </FieldError>
      )}

      <Link
        to="/auth/admin/register"
        className="justify-center-safe mx-auto hover:underline font-extralight text-foreground text-sm"
      >
        Wrong email? <span className="font-black">Go back to Sign up</span>
      </Link>
    </Card>
  );
}
