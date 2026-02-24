import type { Metadata } from 'next';
import blogsData from '@/data/blogs.json';
import type { Blog } from '@/types';
import BlogCard from '@/components/blogs/BlogCard';

export const metadata: Metadata = {
  title: 'Baby Development Blog',
  description:
    'Expert articles on baby milestones, development tips, and parenting guidance — written by paediatricians and child specialists.',
};

const blogs    = blogsData as Blog[];
const featured = blogs.filter((b) => b.featured);
const regular  = blogs.filter((b) => !b.featured);

export default function BlogsPage() {
  return (
    <div className="section-padding page-padding">
      <div className="max-w-5xl mx-auto">

        {/* Page header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-sky-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-sky-600" viewBox="0 0 32 32" fill="none"
                   aria-hidden="true">
                <path d="M6 8h20M6 12h20M6 16h14M6 20h10" stroke="currentColor"
                      strokeWidth="1.8" strokeLinecap="round"/>
                <rect x="3" y="4" width="26" height="24" rx="4" stroke="currentColor"
                      strokeWidth="1.8"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Baby Development Blog
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Evidence-based articles written by paediatric specialists to help you understand
            and support your baby&apos;s development.
          </p>
        </div>

        {/* Featured articles */}
        {featured.length > 0 && (
          <section className="mb-12" aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="text-xl font-bold text-gray-800 mb-5">
              Featured Articles
            </h2>
            <div className="flex flex-col gap-5">
              {featured.map((blog) => (
                <BlogCard key={blog.id} blog={blog} featured />
              ))}
            </div>
          </section>
        )}

        {/* More articles */}
        {regular.length > 0 && (
          <section aria-labelledby="more-heading">
            <h2 id="more-heading" className="text-xl font-bold text-gray-800 mb-5">
              More Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {regular.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
