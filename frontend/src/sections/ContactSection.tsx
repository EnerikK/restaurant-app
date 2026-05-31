import { useContactForm } from '../hooks/use-contact-form'
import { SectionHeading } from '../components/SectionHeading'

export function ContactSection() {
  const { form, onSubmit, isSubmitting, isSuccess, errorMessage } = useContactForm()
  const {
    register,
    formState: { errors },
  } = form

  return (
    <section className="section contact-section" id="contact">
      <SectionHeading
        eyebrow="Contact form"
        title="This form actually validates input and posts to the backend contact endpoint."
      />

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>Name</span>
          <input {...register('name')} type="text" placeholder="Your name" />
          {errors.name ? <small>{errors.name.message}</small> : null}
        </label>

        <label className="field">
          <span>Email</span>
          <input {...register('email')} type="email" placeholder="you@example.com" />
          {errors.email ? <small>{errors.email.message}</small> : null}
        </label>

        <label className="field field-full">
          <span>Message</span>
          <textarea {...register('message')} rows={6} placeholder="Ask about reservations, timings, or group dining." />
          {errors.message ? <small>{errors.message.message}</small> : null}
        </label>

        <div className="form-actions">
          <button className="button button-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
          {isSuccess ? <p className="form-success">Message sent successfully.</p> : null}
          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        </div>
      </form>
    </section>
  )
}
