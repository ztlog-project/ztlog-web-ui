'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';

export default function SideBar() {
  return (
    <aside className="sidebar col-lg-2 col-xl-2">
      <div className="author_profile">
        <div className="author__avatar">
          <img src="/images/profile.png" alt="profile" />
        </div>
        <div className="author__content">
          <div className="author__name" style={{ margin: 'auto' }}>
            <div className="line">
              <label>
                <span>zoetrope</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="author__urls-wrapper">
        <ul className="author__urls social-icons">
          <li>
            <Link href="#" id="location" data-tooltip-text="Suwon, Republic of Korea">
              <FontAwesomeIcon icon={faLocationDot} />
              <span> Republic of Korea</span>
            </Link>
          </li>
          <li>
            <a
              href="mailto:chldpwl5620@gmail.com"
              target="_blank"
              rel="noreferrer"
              id="envelope"
              data-tooltip-text="chldpwl5620@gmail.com"
            >
              <FontAwesomeIcon icon={faEnvelope} />
              <span> Email</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/zoetrope56"
              target="_blank"
              rel="noreferrer"
              id="github"
              data-tooltip-text="github.com/zoetrope56"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span> GitHub</span>
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/tromm_dev"
              target="_blank"
              rel="noreferrer"
              id="twitter"
              data-tooltip-text="twitter.com/tromm_dev"
            >
              <FontAwesomeIcon icon={faTwitter} />
              <span> Twitter</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
