import React, { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const formId = import.meta.env.PUBLIC_WP_CONTACT_FORM_ID;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!formId) {
      setStatus('configure');
      return;
    }
    setStatus('sending');
    setMessage('');
    const data = new FormData(form);
    let response;
    try {
      response = await fetch(`https://dignitas.digital/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, {
        method: 'POST', body: data
      });
    } catch {
      setStatus('error');
      setMessage('Could not reach WordPress. Check that the site is available and allows browser requests to its REST API.');
      return;
    }

    const result = await response.json().catch(() => ({}));
    if (response.ok && result.status === 'mail_sent') {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
      setMessage(response.status === 403
        ? `WordPress denied public access to form ${formId}. Verify the form ID and allow public submissions through the Contact Form 7 REST API.`
        : result.message || 'Sorry, we could not send your message. Please try again or email us directly.');
    }
  }

  return <form onSubmit={handleSubmit} className="contact-form">
    <h3>What can we help you create?</h3>
    <label className="sr-only" htmlFor="contact-name">Your name</label>
    <input id="contact-name" name="username" placeholder="Your name" required />
    <label className="sr-only" htmlFor="contact-email">Work email</label>
    <input id="contact-email" name="email" type="email" placeholder="Work email" required />
    <label className="sr-only" htmlFor="subject">Project details</label>
    <input id="contact-project" name="subject" placeholder="A little about your project" required />
    <button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send project brief ↗'}</button>
    {status === 'success' && <p className="form-note success" role="status">Thanks! Your message has been sent.</p>}
    {status === 'configure' && <p className="form-note" role="status">Connect a Contact Form 7 form by setting PUBLIC_WP_CONTACT_FORM_ID in your .env file.</p>}
    {status === 'error' && <p className="form-note" role="alert">{message}</p>}
  </form>;
}
