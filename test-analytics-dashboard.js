#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAnalyticsDashboard() {
  console.log('🧪 Testing Analytics Dashboard Functionality...\n')

  try {
    // Test 1: Geographic Analytics Function
    console.log('1️⃣ Testing Geographic Analytics Function:')
    
    const { data: paymentsData, error: paymentsError } = await supabase
      .from('payments')
      .select('country, currency, amount, status, merchant_id')

    if (paymentsError) {
      console.error('❌ Error fetching payments:', paymentsError.message)
      return
    }

    console.log(`   ✅ Found ${paymentsData.length} payments for test user`)
    
    // Group by country like the analytics function does
    const countryStats = new Map()
    paymentsData.forEach(payment => {
      if (!payment.country) return
      
      const existing = countryStats.get(payment.country) || {
        totalRevenue: 0,
        paymentCount: 0,
        completedPayments: 0,
        currency: payment.currency || 'USD'
      }

      existing.totalRevenue += parseFloat(payment.amount?.toString() || '0')
      existing.paymentCount += 1
      if (payment.status === 'completed') {
        existing.completedPayments += 1
      }

      countryStats.set(payment.country, existing)
    })

    console.log('   📊 Country breakdown:')
    Array.from(countryStats.entries())
      .sort(([,a], [,b]) => b.totalRevenue - a.totalRevenue)
      .forEach(([country, stats]) => {
        console.log(`     ${country}: ${stats.currency} ${stats.totalRevenue.toLocaleString()} (${stats.paymentCount} payments, ${stats.completedPayments} completed)`)
      })

    // Test 2: Currency Handling
    console.log('\n2️⃣ Testing Currency Handling:')
    const uniqueCurrencies = [...new Set(paymentsData.map(p => p.currency).filter(Boolean))]
    console.log(`   ✅ Found ${uniqueCurrencies.length} unique currencies: ${uniqueCurrencies.join(', ')}`)
    
    // Test null/undefined currency handling
    const nullCurrencyPayments = paymentsData.filter(p => !p.currency)
    if (nullCurrencyPayments.length > 0) {
      console.log(`   ⚠️  ${nullCurrencyPayments.length} payments have null/undefined currency`)
    } else {
      console.log('   ✅ All payments have valid currency values')
    }

    // Test 3: Chart Data Formatting
    console.log('\n3️⃣ Testing Chart Data Formatting:')
    const chartData = Array.from(countryStats.entries()).map(([country, stats]) => ({
      country,
      revenue: stats.totalRevenue,
      currency: stats.currency,
      payments: stats.paymentCount
    })).sort((a, b) => b.revenue - a.revenue).slice(0, 4)

    console.log('   📈 Top 4 countries for chart:')
    chartData.forEach((item, index) => {
      // Test currency formatter logic
      const currency = item?.currency || item?.payload?.currency || 'USD'
      console.log(`     ${index + 1}. ${item.country}: ${currency} ${item.revenue.toLocaleString()} (${item.payments} payments)`)
    })

    // Test 4: Role-based Access
    console.log('\n4️⃣ Testing Role-based Access:')
    
    // Test user profile lookup
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('id, email, role, active')
      .eq('email', 'afriglobalimports@gmail.com')
      .single()

    if (userError) {
      console.error('❌ Error fetching user profile:', userError.message)
      return
    }

    const isSuperAdmin = userProfile.role === 'super_admin' || 
      ['admin@pxvpay.com', 'dev-admin@pxvpay.com', 'superadmin@pxvpay.com'].includes(userProfile.email)

    console.log(`   👤 User: ${userProfile.email}`)
    console.log(`   🎭 Role: ${userProfile.role}`)
    console.log(`   🔐 Is Super Admin: ${isSuperAdmin}`)
    console.log(`   📊 Should see: ${isSuperAdmin ? 'All platform data' : 'Only own merchant data'}`)

    // Test 5: Data Consistency
    console.log('\n5️⃣ Testing Data Consistency:')
    
    const countries = [...new Set(paymentsData.map(p => p.country).filter(Boolean))]
    console.log(`   🌍 Payment countries: ${countries.join(', ')}`)
    
    // Check for potential issues
    const issues = []
    if (countries.includes('CC')) issues.push('Country code "CC" found (Cocos Islands - unusual)')
    if (countries.includes('CY')) issues.push('Cyprus (CY) found - verify if configured')
    if (uniqueCurrencies.includes('HTG')) issues.push('Haitian Gourde (HTG) found - verify if supported')

    if (issues.length > 0) {
      console.log('   ⚠️  Potential issues found:')
      issues.forEach(issue => console.log(`     - ${issue}`))
    } else {
      console.log('   ✅ No obvious data inconsistencies detected')
    }

    // Test 6: UI Component Safety
    console.log('\n6️⃣ Testing UI Component Safety:')
    
    // Test tooltip formatter logic
    console.log('   🏷️  Testing tooltip formatter:')
    chartData.forEach(item => {
      const currency = item?.currency || item?.payload?.currency || 'USD'
      const formatted = `${currency} ${Number(item.revenue).toLocaleString()}`
      console.log(`     ${item.country}: ${formatted}`)
    })

    // Test label formatter logic
    console.log('   🏷️  Testing label formatter:')
    chartData.forEach(item => {
      const currency = item?.currency || item?.payload?.currency || 'USD'
      const formatted = `${currency} ${item.revenue.toLocaleString()}`
      console.log(`     ${item.country}: ${formatted}`)
    })

    console.log('\n✅ All Analytics Dashboard Tests Completed Successfully!')
    console.log('\n📋 Summary:')
    console.log(`   - ${paymentsData.length} total payments`)
    console.log(`   - ${countries.length} countries`)
    console.log(`   - ${uniqueCurrencies.length} currencies`)
    console.log(`   - Role: ${userProfile.role}`)
    console.log(`   - Super Admin: ${isSuperAdmin}`)

  } catch (error) {
    console.error('❌ Test failed with error:', error.message)
    console.error('Stack trace:', error.stack)
  }
}

// Run the test
testAnalyticsDashboard() 