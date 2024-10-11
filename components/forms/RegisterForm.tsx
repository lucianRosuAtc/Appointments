"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"



const RegisterForm = ({user}:{user: User}) => {
  const router = useRouter()
const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })


  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)

    try{
        const userData = { name, email, phone}

        const user = await createUser(userData)

        if(user) router.push(`/patients/${user.$id}/register`)
        
    }catch (error){
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome to our clinic</h1>
          <p className="text-neutral-400">Schedule your first appointment.</p>

        </section>

      <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Full Name"
        placeholder="Tommy Oliver"
        iconSrc= "/assets/icons/user.svg"
        iconAlt="User Icon"
      />

        <SubmitButton className="" isLoading={ isLoading }>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
