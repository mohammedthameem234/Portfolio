import React from 'react'

const SERVICES = [
  {
    title: 'Full-Stack Engineering',
    body:
      'Architecting end-to-end web applications, resilient RESTful APIs, and secure full-cycle production deployments.',
  },
  {
    title: 'Modern Web Development',
    body:
      'Developing semantic, high-performance, and responsive web applications with modern frameworks and fluid design systems.',
  },
  {
    title: 'UI/UX & Product Design',
    body:
      'Designing clean, intuitive, and accessible user interfaces focused on typography, micro-interactions, and visual elegance.',
  },
  {
    title: 'Backend & Cloud Systems',
    body:
      'Building robust server-side runtimes, relational and NoSQL database schemas, and reliable communication services.',
  },
]

const SubHeader = () => {
  return (
    <div className='w-full z-10 flex flex-col items-center lg:items-start text-center lg:text-left'>
      <div className='w-full text-base sm:text-lg lg:text-xl flex flex-col gap-4 leading-relaxed'>
        <p className="font-semibold text-fg text-lg sm:text-xl lg:text-2xl leading-snug">
          &ldquo;Navigating through layers of complexity, I craft clean, intuitive solutions to deliver seamless, end-to-end digital experiences.&rdquo;
        </p>
        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
          I am an Information Technology student with a deep passion for full‑stack engineering, building complete solutions from interactive front‑end design to resilient back‑end logic. Driven by curiosity, I actively explore emerging frameworks and modern technologies, communicating complex ideas with clarity and collaborating effectively across teams.
        </p>
        <p className="text-sm sm:text-base text-fg-muted leading-relaxed">
          I aim to grow as a versatile software engineer who crafts impactful applications and contributes meaningfully to the developer community.
        </p>
      </div>

      <div className='about-inline-services w-full mt-8 lg:mt-10'>
        <div className='about-inline-services__head'>
          <span className='about-inline-services__label'>CORE DISCIPLINES &amp; SERVICES</span>
        </div>
        <div className='about-inline-services__grid'>
          {SERVICES.map((service) => (
            <article key={service.title} className='about-inline-services__item'>
              <h4>{service.title}</h4>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SubHeader
