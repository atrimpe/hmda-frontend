import React from "react"
import Alert from "../../common/Alert"
import { HeaderDocsLink } from './Header'

export const HeaderLate = ({
  endDate,
  lateDate,
  period,
}) => {
  
  return (
    <Alert heading={`The ${period} filing period is closed.`} type='warning'>
      <>
        <p>
          The HMDA Platform remains available outside of the filing period for
          late submissions and resubmissions of 2020 HMDA data until{' '}
          <strong>{endDate}</strong>.
        </p>
        <p className='margin-0'>
          <HeaderDocsLink period={period} />
          <br />
          You may file HMDA data for your authorized institutions below.
        </p>
      </>
    </Alert>
  )
}
