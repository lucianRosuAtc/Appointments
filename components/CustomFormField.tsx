'use client'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, Form } from "react-hook-form"
import { FormFieldType } from "./forms/PatientForm"
import Image from "next/image"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>,
  fieldType: FormFieldType,
  disabled?: boolean,
  name: string,
  label?: string,
  placeholder?: string,
  iconAlt?: string,
  iconSrc?: string,
  dateFormat?: string,
  showTimeSelect?: boolean,
  children?: React.ReactNode,
  renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({field, props}: {field:any;  props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat } = props;

 switch (fieldType) {
    case FormFieldType.INPUT:
      return(
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
           <Image
            src={iconSrc}
            alt={iconAlt || 'icon'}
            width={24}
            height={24}
            className="ml-2" 
           />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      )
      case FormFieldType.PHONE_INPUT:
        return(
          <FormControl>
            <PhoneInput 
              defaultCountry="US"
              placeholder={placeholder}
              international
              withCountryCallingCode
              // @ts-expect-error: Type 'any' is not assignable to type 'E164Number | undefined'
              value={field.value as E164Number | undefined}
              onChange={field.onChange}
              className="input-phone"
            />
          </FormControl>
        )

        case FormFieldType.DATE_PICKER:
          return(
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
                <Image 
                  src="/assets/icons/calendar.svg"
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="ml-2"
                />
           <FormControl>
           <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
           dateFormat={dateFormat ?? 'MM/dd/yyyy'}
           showTimeSelect = {showTimeSelect ?? false}
           timeInputLabel="Time:"
           />
       </FormControl>
            </div>
          )

      default:
        break;
}
}

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props}/>

          <FormMessage className="shad-error"/>
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
