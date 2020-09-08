export const SESSION_REFUND_TYPE = {
    REFUND: 'Refund', 
    VOUCHER_CONFIRMED: 'Voucher - Opted',
    VOUCHER_OPTED: 'Voucher - Confirmed',
}

export const exportHeaderRow = [
    'Invoice', 
    'Office', 
    'Cancel Status',
    'First Name', 
    'Last Name',
    'Offer Code',
    'Offer Description',
    'Letter Sent Date', 
    'Offer Expiration Date', 
    'Updated At',
    'Updated By',
    'Completed', 
    'Completed At'
]

export const officeOptions = [
    {label: 'NEW YORK', value: 'New York'}, 
    {label: 'LOS ANGELES', value: 'Los Angeles'}, 
    {label: 'CHICAGO', value: 'Chicago'}, 
    {label: 'AUSTIN', value: 'Austin'}
]

export const offerCodeOptions = offerCodes => [
    ...offerCodes.map(o => ({label: o, value: o}))
]

export const statusOptions = [
    {label: SESSION_REFUND_TYPE.VOUCHER_CONFIRMED, value: SESSION_REFUND_TYPE.VOUCHER_CONFIRMED},
    {label: SESSION_REFUND_TYPE.VOUCHER_OPTED, value: SESSION_REFUND_TYPE.VOUCHER_OPTED},
    {label: SESSION_REFUND_TYPE.REFUND, value: SESSION_REFUND_TYPE.REFUND},
]