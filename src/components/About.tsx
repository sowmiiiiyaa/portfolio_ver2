import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { profile } from '@/data/siteData';

type AboutProps = {
  profileImageAvailable: boolean;
};

export function About({ profileImageAvailable }: AboutProps) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [profileImageAvailable]);

  return (
    <section id="about" className="section-shell about-scene">
      <div className="about-scene__mesh" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="about-layout">
        <motion.div
          className="about-photo"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          {profileImageAvailable && !imageFailed ? (
            <img
              src="/profile.jpg"
              alt="Portrait of Sowmiya S"
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="about-photo__fallback" role="img" aria-label="Profile photograph unavailable">
              <span>PHOTO</span>
              <small>Add /profile.jpg to public to display the uploaded photograph.</small>
            </div>
          )}
        </motion.div>
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">About / context</p>
          <h2>Learning systems by building them.</h2>
          <p>{profile.about}</p>
        </motion.div>

        <motion.div
          className="about-details"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          <div className="about-detail">
            <GraduationCap aria-hidden="true" />
            <div>
              <span>Education</span>
              <strong>{profile.degree}</strong>
              <p>{profile.college} · {profile.graduation}</p>
            </div>
          </div>
          <div className="about-detail">
            <MapPin aria-hidden="true" />
            <div>
              <span>Based in</span>
              <strong>{profile.location}</strong>
              <p>Focused on DevOps foundations, cloud concepts, and automation.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
