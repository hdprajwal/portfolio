import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';

const ContactLink = ({
  icon,
  href,
  name,
  value,
}: {
  icon: React.ReactNode;
  href: string;
  name: string;
  value: string;
}) => {
  return (
    <Link
      href={href}
      className="group flex items-center text-sm transition-transform duration-200 ease-out hover:-translate-y-0.5"
    >
      <span className="text-muted-foreground group-hover:text-primary mr-3 transition-colors">
        {icon}
      </span>
      <span className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors">
        {name}
      </span>
      <span className="border-border mx-4 flex-grow border-b border-dashed" />
      <span className="text-muted-foreground group-hover:text-primary flex shrink-0 items-center gap-1 transition-colors">
        {value}
        <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" />
      </span>
    </Link>
  );
};

export default function ContactSection() {
  return (
    <div className="mt-6 flex flex-col gap-5">
      <ContactLink
        icon={<Mail className="h-4 w-4" />}
        href="mailto:hdprajwal01@gmail.com"
        name="Email"
        value="hdprajwal01@gmail.com"
      />
      <ContactLink
        icon={<GithubIcon className="h-4 w-4" />}
        href="https://github.com/hdprajwal"
        name="GitHub"
        value="github.com/hdprajwal"
      />
      <ContactLink
        icon={<LinkedinIcon className="h-4 w-4" />}
        href="https://www.linkedin.com/in/hdprajwal"
        name="LinkedIn"
        value="in/hdprajwal"
      />
      <ContactLink
        icon={<TwitterIcon className="h-4 w-4" />}
        href="https://x.com/_hdprajwal"
        name="X/Twitter"
        value="@_hdprajwal"
      />
    </div>
  );
}
