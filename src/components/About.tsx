import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { profile } from '@/data/siteData';

type AboutProps = {
  profileImageAvailable: boolean;
};

export function About({ profileImageAvailable: _profileImageAvailable }: AboutProps) {
  return (
    <section id="about" className="section-shell about-scene">
      <div className="about-scene__mesh" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="about-layout">
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">About / context</p>
          <h2>Learning how software moves from code to a working environment.</h2>
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
