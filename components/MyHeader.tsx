import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '../public/static/images/avatar.png'
import Image from 'next/image'
import Link from './Link'

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="mb-8 flex flex-row gap-4">
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="group grid h-8 w-8  ">
              <Image src={Logo} alt="描述图片" width={40} height={40} priority />
            </div>
          </div>
        </Link>
        {/* <LangSwitch /> */}
      </div>
      {/* <div className="h-[1px] w-full bg-zinc-400"></div> */}
    </header>
  )
}

export default Header
