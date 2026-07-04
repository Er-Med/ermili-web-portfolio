import { CalEmbed } from "@/components/booking/cal-embed";

export function BookingSection() {
  return (
    <section className="section booking hidden" id="book">
      <div className="container-wide">
        <header className="booking-head reveal">
          <span className="eyebrow">Let&apos;s talk!</span>
          <h2 className="section-title">Book a free discovery call</h2>
          <p className="section-sub">
            Pick a date and time that works for you. I&apos;ll confirm your slot within 24
            hours.
          </p>
        </header>
        <CalEmbed />
      </div>
    </section>
  );
}
