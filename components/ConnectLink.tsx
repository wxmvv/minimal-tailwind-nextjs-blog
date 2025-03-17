// @ts-nocheck
import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
} from './social-icons/icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  icon?: boolean
  iconSize?: number
}

const ConnectLink = ({ kind, href, icon = false, iconSize = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      href={href}
      className="inline-flex items-center justify-start gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon && (
        <SocialSvg
          className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${iconSize} w-${iconSize}`}
        />
      )}
      <div className="text-gray-900 underline decoration-gray-100 underline-offset-2 transition hover:decoration-gray-400 dark:text-gray-100  dark:decoration-gray-500 dark:hover:decoration-gray-200">
        <span className="capitalize">{kind}</span>
      </div>
    </a>
  )
}

export default ConnectLink
