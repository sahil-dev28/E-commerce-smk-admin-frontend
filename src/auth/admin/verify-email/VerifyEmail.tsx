import { useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "@/hooks/auth/admin/useVerifyEmail";
import { useEffect } from "react";
import verifyingIcon from "../../../../public/Verifying.webp";

export default function VerifyEmail() {
  const { mutateAsync: verifyEmail } = useVerifyEmail();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !email) {
      navigate("/auth/admin/login");
      return;
    }

    verifyEmail({ token, email }).finally(() => {
      navigate("/auth/admin/login");
    });
  }, [token, email]);

  return (
    <div className="flex flex-1 flex-col items-center h-full justify-center px-4">
      <div className="flex justify-center mb-4">
        <img
          src={verifyingIcon}
          className="w-40 h-40 object-contain"
          alt="Verifying email"
        />
      </div>

      <h1 className="text-center text-2xl font-semibold text-[#8F6B3F]">
        Verifying your email
      </h1>

      <p className="text-center mt-2 text-[#6F5846]">
        Please be patient while we confirm your email address.
      </p>
    </div>
  );
}
