import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

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
      source, // 'en' or 'he'
      page_url: req.headers.get('referer') || null,
      ip: req.headers.get('x-forwarded-for') || null,
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
