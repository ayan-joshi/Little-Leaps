import type { Blog } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  blog: Blog;
  featured?: boolean;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogCard({ blog, featured = false }: BlogCardProps) {
  const imgSrc = blog.image.startsWith('/images') ? blog.image : '/images/blog-placeholder.svg';

  return (
    <article
      className={`card-base flex flex-col overflow-hidden transition-transform duration-200
                  hover:-translate-y-1 hover:shadow-md ${featured ? 'sm:flex-row' : ''}`}
    >
      {/* Thumbnail */}
      <div className={`relative shrink-0 overflow-hidden ${featured ? 'sm:w-60' : 'h-44'}`}>
        <Image
          src={imgSrc}
          alt={`Illustration for: ${blog.title}`}
          width={400}
          height={260}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            label={blog.category}
            color={
              blog.category === 'Development' ? 'lavender' :
              blog.category === 'Activities'  ? 'mint'     :
              blog.category === 'Language'    ? 'sky'      :
              blog.category === 'Health'      ? 'blush'    : 'peach'
            }
          />
          {blog.featured && <Badge label="Featured" color="peach" />}
        </div>

        <div>
          <h3 className={`font-bold text-gray-800 leading-snug ${featured ? 'text-lg' : 'text-base'}`}>
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{blog.excerpt}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            <p className="text-xs font-semibold text-gray-700">{blog.author.name}</p>
            <p className="text-xs text-gray-400">
              <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
            </p>
          </div>
          <span className="text-xs text-gray-400">{blog.readingTime} min read</span>
        </div>

        <Link
          href={`/blogs/${blog.slug}`}
          className="text-sm font-bold text-blush-500 hover:text-blush-600 transition-colors
                     focus-ring rounded w-fit inline-flex items-center gap-1"
          aria-label={`Read article: ${blog.title}`}
        >
          Read more
          <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}
