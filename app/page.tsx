import PatientForm from "@/components/forms/PatientForm";

import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
{/* authentification */}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="Appointments logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="flex justify-between text-sm mt-20">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 Appointments
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image 
      src="/assets/images/onboarding-img.png"
      alt="Secretary"
      width={1000}
      height={1000}
      className="side-img max-w-[50%]"
      />
    </div>
  )
}
