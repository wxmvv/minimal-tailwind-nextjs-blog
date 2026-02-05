import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, tag }) => {
  const renderImage = () => (
    <Image
      alt={title}
      src={imgSrc}
      className="h-40 object-cover object-center"
      width={544}
      height={306}
    />
  )
  return (
    <>
      <div className="h-96 overflow-hidden rounded-xl border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
        {imgSrc && (
          <Link href={href} aria-label={`Link to ${title}`}>
            {renderImage()}
          </Link>
        )}
        {/* 磨砂tag */}
        {tag && (
          <div className="liquid_glass-wrapper !absolute right-2 top-2 z-10 m-4 w-fit p-2 ">
            <div className="z-20 font-semibold">{tag}</div>
            <div className="liquid_glass-outer"></div>
            <div className="liquid_glass-cover"></div>
            <div className="liquid_glass-sharp"></div>
            <div className="liquid_glass-reflect"></div>
          </div>
        )}

        <div className="flex h-56 flex-col gap-4 p-6">
          {title && (
            <h2 className="max-h-10 text-base font-bold leading-4 tracking-tight">
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            </h2>
          )}
          {description && (
            <p className="prose h-36 max-w-none overflow-scroll text-sm font-normal  text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {href && (
            <Link
              href={href}
              className="h-10 text-sm font-medium leading-4 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more &rarr;
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Card
