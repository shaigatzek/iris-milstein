import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, interest, source } = body

    if (!name || !phone || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { error } = await supabaseAdmin.from('leads').insert({
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      interest: interest || null,
      source,
      page_url: req.headers.get('referer') || null,
      ip: req.headers.get('x-forwarded-for') || null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const lang = source === 'he' ? 'עברית' : 'English'
      const { data, error: emailError } = await resend.emails.send({
        from: 'IrisMilstein.com <noreply@irismilstein.com>',
        to: 'iris@irismilstein.com',
        subject: `פנייה חדשה מהאתר - ${name.trim()}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; direction: rtl;">
            <h2 style="color: #C8A49A;">פנייה חדשה מהאתר</h2>
            <p><strong>שם:</strong> ${name.trim()}</p>
            <p><strong>טלפון:</strong> ${phone.trim()}</p>
            ${email ? `<p><strong>מייל:</strong> ${email.trim()}</p>` : ''}
            ${interest ? `<p><strong>עניין:</strong> ${interest}</p>` : ''}
            <p><strong>שפה:</strong> ${lang}</p>
            <hr style="border-color: #C8A49A; margin: 16px 0;" />
            <p style="color: #999; font-size: 12px;">נשלח מ-irismilstein.com</p>
          </div>
        `,
      })
      if (emailError) console.error('Resend error:', emailError)
      else console.log('Email sent:', data?.id)
    } else {
      console.warn('RESEND_API_KEY not set')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
