CREATE TABLE IF NOT EXISTS bharatyatra_users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL UNIQUE,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bharatyatra_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES bharatyatra_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS bharatyatra_sessions_expiry_idx
  ON bharatyatra_sessions (expires_at);

CREATE TABLE IF NOT EXISTS bharatyatra_adventure_bookings (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  package_name VARCHAR(160) NOT NULL,
  destination VARCHAR(100) NOT NULL,
  activity_date DATE NOT NULL,
  participants SMALLINT NOT NULL CHECK (participants BETWEEN 1 AND 12),
  unit_amount_paise INTEGER NOT NULL CHECK (unit_amount_paise > 0),
  total_amount_paise INTEGER NOT NULL CHECK (total_amount_paise > 0),
  customer_name VARCHAR(80) NOT NULL,
  customer_email VARCHAR(254) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  payment_method VARCHAR(16) NOT NULL DEFAULT 'razorpay'
    CHECK (payment_method IN ('upi', 'card', 'netbanking', 'wallet')),
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT UNIQUE,
  payment_status VARCHAR(16) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'requested', 'paid', 'failed')),
  email_status VARCHAR(16) NOT NULL DEFAULT 'pending'
    CHECK (email_status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

ALTER TABLE bharatyatra_adventure_bookings
  ALTER COLUMN razorpay_order_id DROP NOT NULL;
ALTER TABLE bharatyatra_adventure_bookings
  ADD COLUMN IF NOT EXISTS payment_method VARCHAR(16) NOT NULL DEFAULT 'razorpay';
ALTER TABLE bharatyatra_adventure_bookings
  DROP CONSTRAINT IF EXISTS bharatyatra_adventure_bookings_payment_status_check;
ALTER TABLE bharatyatra_adventure_bookings
  ADD CONSTRAINT bharatyatra_adventure_bookings_payment_status_check
  CHECK (payment_status IN ('pending', 'requested', 'paid', 'failed'));
ALTER TABLE bharatyatra_adventure_bookings
  DROP CONSTRAINT IF EXISTS bharatyatra_adventure_bookings_payment_method_check;
ALTER TABLE bharatyatra_adventure_bookings
  ADD CONSTRAINT bharatyatra_adventure_bookings_payment_method_check
  CHECK (payment_method IN ('upi', 'card', 'netbanking', 'wallet'));

CREATE INDEX IF NOT EXISTS bharatyatra_bookings_created_idx
  ON bharatyatra_adventure_bookings (created_at DESC);
