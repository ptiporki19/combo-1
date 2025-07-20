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

async function checkDatabaseState() {
  console.log('🔍 Checking Database State...\n')

  try {
    // Check users table
    console.log('👥 Users Table:')
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)

    if (usersError) {
      console.error('❌ Error fetching users:', usersError.message)
    } else {
      console.log(`   Found ${users.length} users (showing first 5)`)
      users.forEach(user => {
        console.log(`   - ${user.email} (${user.role}) - ID: ${user.id}`)
      })
    }

    // Check for the specific test user
    console.log('\n🎯 Test User Check:')
    const { data: testUser, error: testUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'afriglobalimports@gmail.com')

    if (testUserError) {
      console.error('❌ Error fetching test user:', testUserError.message)
    } else if (testUser.length === 0) {
      console.log('   ❌ Test user not found')
    } else {
      console.log(`   ✅ Found test user:`)
      testUser.forEach(user => {
        console.log(`   - Email: ${user.email}`)
        console.log(`   - Role: ${user.role}`)
        console.log(`   - Active: ${user.active}`)
        console.log(`   - ID: ${user.id}`)
      })
    }

    // Check payments table
    console.log('\n💳 Payments Table:')
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .limit(10)

    if (paymentsError) {
      console.error('❌ Error fetching payments:', paymentsError.message)
    } else {
      console.log(`   Found ${payments.length} payments (showing first 10)`)
      payments.forEach(payment => {
        console.log(`   - ${payment.country || 'No Country'} | ${payment.currency || 'No Currency'} | ${payment.amount} | ${payment.status} | Merchant: ${payment.merchant_id}`)
      })
    }

    // Check if there are any payments for our test user
    if (testUser && testUser.length > 0) {
      console.log('\n🎯 Test User Payments:')
      const { data: userPayments, error: userPaymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('merchant_id', testUser[0].id)

      if (userPaymentsError) {
        console.error('❌ Error fetching user payments:', userPaymentsError.message)
      } else {
        console.log(`   Found ${userPayments.length} payments for test user`)
        userPayments.forEach(payment => {
          console.log(`   - ${payment.country || 'No Country'} | ${payment.currency || 'No Currency'} | ${payment.amount} | ${payment.status}`)
        })
      }
    }

    // Check total counts
    console.log('\n📊 Database Summary:')
    
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
    
    const { count: totalPayments } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true })

    console.log(`   Total Users: ${totalUsers}`)
    console.log(`   Total Payments: ${totalPayments}`)

  } catch (error) {
    console.error('❌ Database check failed:', error.message)
    console.error('Stack trace:', error.stack)
  }
}

// Run the check
checkDatabaseState() 