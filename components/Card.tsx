import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => {
  const renderImage = () => (
    <Image
      alt={title}
      src={imgSrc}
      className="object-cover object-center"
      width={544}
      height={306}
    />
  )
  return href ? (
    <div className="overflow-hidden rounded-xl border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      {imgSrc && (
        <Link href={href} aria-label={`Link to ${title}`}>
          {renderImage()}
        </Link>
      )}
      <div className="flex flex-col gap-4 p-6">
        {title && (
          <h2 className="text-base font-bold leading-4 tracking-tight">
            <Link href={href} aria-label={`Link to ${title}`}>
              {title}
            </Link>
          </h2>
        )}
        {description && (
          <p className="prose max-w-none text-sm font-normal text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
        <Link
          href={href}
          className="text-sm font-medium leading-4 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label={`Link to ${title}`}
        >
          Learn more &rarr;
        </Link>
      </div>
    </div>
  ) : (
    <div className="overflow-hidden rounded-xl border-2 border-gray-200 border-opacity-60 dark:border-gray-700">
      {imgSrc && renderImage()}
      <div className="flex flex-col gap-4 p-6">
        {title && <h2 className="text-base font-bold leading-4 tracking-tight">{title}</h2>}
        {description && (
          <p className="prose max-w-none text-sm font-normal text-gray-600 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default Card
