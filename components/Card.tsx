import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href, tag }) => {
  const renderImage = () => (
    <Image
      alt={title}
      src={imgSrc}
      className="aspect-[16/9] w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
      width={544}
      height={306}
    />
  )
  return (
    <>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 transition-colors duration-200 hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700">
        {imgSrc && (
          <>
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {renderImage()}
              </Link>
            ) : (
              renderImage()
            )}
          </>
        )}
        {tag && (
          <div className="absolute right-3 top-3 z-10 rounded-full border border-white/70 bg-white/85 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-gray-700 backdrop-blur dark:border-white/10 dark:bg-gray-950/70 dark:text-gray-200">
            {tag}
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-5">
          {title && (
            <h2 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              {href ? (
                <Link
                  href={href}
                  aria-label={`Link to ${title}`}
                  className="transition-colors hover:text-primary-500"
                >
                  {title}
                </Link>
              ) : (
                title
              )}
            </h2>
          )}
          {description && (
            <p className="prose max-w-none flex-1 text-sm leading-6 text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
          {href && (
            <Link
              href={href}
              className="mt-2 text-sm font-medium text-gray-500 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              Learn more
            </Link>
          )}
        </div>
      </article>
    </>
  )
}

export default Card
