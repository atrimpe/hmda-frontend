import React from 'react'

import './Footer.css'
import logo from '../images/ffiec-logo.svg'
import { getKeycloak } from '../utils/keycloak.js'
import ReleaseVersion from '../../common/ReleaseVersion'

export const getLink = filingPeriod => {
  if (getKeycloak().authenticated) return `/filing/${filingPeriod}/institutions`
  return `/filing/${filingPeriod}/`
}

const Footer = props => {
  const cname = 'Footer footer footer-slim' + (props.maintenanceMode ? ' maintenance' : '')

  return (
    <footer className={cname} role="contentinfo">
      <div className="full-width">
        <button className="return-to-top button-link" onClick={e => {
          e.preventDefault()
          window.scrollTo(0,0)
        }}>
          Return to top
        </button>
      </div>
      <div className="footer-primary-section">
        <div className="full-width">
          <nav className="half-width footer-nav">
            <ul className="unstyled-list">
              <li className="footer-primary-content">
                <a
                  className="nav-link"
                  href={getLink(props.filingPeriod)}
                  title="Home"
                  aria-label="Home"
                >
                  <img src={logo} height="21px" alt="FFIEC" />
                  <span>Home Mortgage Disclosure Act</span>
                </a>
                <ReleaseVersion />
              </li>
            </ul>
          </nav>
          <div className="half-width">
            <a href="mailto:hmdahelp@cfpb.gov">Questions?</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
