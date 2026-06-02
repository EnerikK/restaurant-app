import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import type { Messages } from '../i18n/messages'
import { postContact } from '../lib/api'

function createContactSchema(messages: Messages) {
  return z.object({
    name: z.string().trim().min(2, messages.contactForm.validation.nameTooShort),
    email: z.email(messages.contactForm.validation.invalidEmail),
    message: z
      .string()
      .trim()
      .min(10, messages.contactForm.validation.messageTooShort)
      .max(2000, messages.contactForm.validation.messageTooLong),
  })
}

type ContactSchema = ReturnType<typeof createContactSchema>
export type ContactFormValues = z.infer<ContactSchema>

export function useContactForm(messages: Messages) {
  const contactSchema = createContactSchema(messages)
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const mutation = useMutation({
    mutationFn: postContact,
    onSuccess: () => {
    form.reset()
    },
  })

  let errorMessage: string | null = null
  if (mutation.error) {
    if (axios.isAxiosError(mutation.error)) {
      errorMessage = messages.contactForm.actions.genericError
    } else if (mutation.error instanceof Error) {
      errorMessage = mutation.error.message
    } else {
      errorMessage = messages.contactForm.actions.genericError
    }
  }

  const onSubmit = form.handleSubmit(async (values) => {
    await mutation.mutateAsync(values)
  })

  return {
    form,
    onSubmit,
    isSubmitting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    errorMessage,
  }
}
