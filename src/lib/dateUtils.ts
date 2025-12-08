/**
 * Utility functions for date-based authentication logic
 */

/**
 * Gets the current date in a specific timezone or UTC
 * @param timezone - IANA timezone string (e.g., 'Asia/Kolkata', 'America/New_York') or 'UTC'
 * @returns Date object representing current date in the specified timezone
 */
function getCurrentDateInTimezone(timezone?: string): Date {
  const now = new Date();
  
  if (!timezone || timezone === 'UTC') {
    // Use UTC
    return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  }
  
  try {
    // Use Intl.DateTimeFormat to get date in specific timezone
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    
    const parts = formatter.format(now).split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Month is 0-indexed
    const day = parseInt(parts[2]);
    
    return new Date(year, month, day);
  } catch (error) {
    console.warn(`Invalid timezone '${timezone}', falling back to server local time:`, error);
    // Fallback to server local time
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
}

/**
 * Checks if OTP authentication is required based on the current date
 * and the NEXT_PUBLIC_OTP_AUTH_FROM environment variable
 * @returns boolean - true if OTP is required, false if it should be bypassed
 */
export function isOTPRequired(): boolean {
  const otpAuthFromDate = process.env.NEXT_PUBLIC_OTP_AUTH_FROM;
  const timezone = process.env.NEXT_PUBLIC_TIMEZONE; // Optional timezone override
  
  // If no date is configured, always require OTP (default behavior)
  if (!otpAuthFromDate) {
    return true;
  }
  
  try {
    // Parse the date from DD-MM-YYYY format
    const [day, month, year] = otpAuthFromDate.split('-').map(Number);
    
    // Create date object (month is 0-indexed in JavaScript)
    const otpStartDate = new Date(year, month - 1, day);
    const currentDate = getCurrentDateInTimezone(timezone);
    
    // Reset time to compare only dates (already done in getCurrentDateInTimezone)
    otpStartDate.setHours(0, 0, 0, 0);
    
    // OTP is required if current date is >= the configured start date
    return currentDate >= otpStartDate;
  } catch (error) {
    console.error('Error parsing NEXT_PUBLIC_OTP_AUTH_FROM date:', error);
    // If there's an error parsing the date, default to requiring OTP for security
    return true;
  }
}

/**
 * Formats a date string for logging purposes
 * @param dateStr - Date string in DD-MM-YYYY format
 * @returns formatted date string or error message
 */
export function formatOTPAuthDate(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return 'Invalid date format';
  }
}
