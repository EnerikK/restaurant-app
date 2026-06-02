import { useContactForm } from '../hooks/use-contact-form'
import { SectionHeading } from '../components/SectionHeading'
import { useI18n } from '../i18n/useI18n'

export function ContactSection() {
  const { messages } = useI18n()
  const { form, onSubmit, isSubmitting, isSuccess, errorMessage } = useContactForm(messages)
  const {
    register,
    formState: { errors },
  } = form

  return (
    <section className="section contact-section" id="contact">
      <SectionHeading
        eyebrow={messages.contactForm.eyebrow}
        title={messages.contactForm.title}
      />

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>{messages.contactForm.fields.name}</span>
          <input {...register('name')} type="text" placeholder={messages.contactForm.placeholders.name} />
          {errors.name ? <small>{errors.name.message}</small> : null}
        </label>

        <label className="field">
          <span>{messages.contactForm.fields.email}</span>
          <input {...register('email')} type="email" placeholder={messages.contactForm.placeholders.email} />
          {errors.email ? <small>{errors.email.message}</small> : null}
        </label>

        <label className="field field-full">
          <span>{messages.contactForm.fields.message}</span>
          <textarea
            {...register('message')}
            rows={6}
            placeholder={messages.contactForm.placeholders.message}
          />
          {errors.message ? <small>{errors.message.message}</small> : null}
        </label>

        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? messages.contactForm.actions.sending : messages.contactForm.actions.send}
          </button>
          {isSuccess ? <p className="form-success">{messages.contactForm.actions.success}</p> : null}
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}
