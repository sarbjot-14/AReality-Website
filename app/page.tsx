import Image from 'next/image';

export default async function LandingPage() {
  return (
    <>
      <div className="flex flex-col items-center p-5">
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 lg:py-20 mx-auto  lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white">
                Empowering brands with engaging augmented reality tools
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                AReality can help leverage the virality of social media and
                create fun augmented reality filters that will foster closer
                relationships with your customer base.
              </p>
              <a
                target="_blank"
                aria-label="TikTok"
                href="https://www.tiktok.com/@arealitymedia"
                className="inline-flex items-center justify-center mb-5 px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Our Portfolio
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </a>
              <a
                target="_blank"
                href="https://calendly.com/areality/areality-marketing-inquiry"
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Book a meeting
              </a>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex ml-20">
              <Image
                src="/social_illus.svg"
                width={350}
                height={350}
                color="blue"
                alt="Future of marketing"
              ></Image>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 lg:mx-16 py-5 lg:py-10">
          <div className="gap-8 items-center py-16 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
            <img
              className="w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup.svg"
              alt="dashboard image"
            ></img>
            <img
              className="w-full hidden dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg"
              alt="dashboard image"
            ></img>
            <div className="mt-4 md:mt-0">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Launch campaigns and monitor customer engagement
              </h2>
              <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">
                Create customizable campaigns with ability to advertise services
                and products. Generate leads by enabling custom data inputs.
                Supervise ad spend through our dashboards.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 lg:mx-16 lg:py-10">
          <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
            <div className="max-w-screen-md mb-8 lg:mb-16">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                Designed for business teams like yours
              </h2>
              <p className="text-gray-500 sm:text-xl dark:text-gray-400">
                Here at AReality we focus on markets where technology,
                innovation, and social media can unlock long-term value and
                drive user engagement.
              </p>
            </div>
            <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-neutral lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-primary text-xl font-bold dark:text-white">
                  Marketing
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Plan it, create it, launch it. Collaborate seamlessly with all
                  the organization and hit your marketing goals every month with
                  our marketing plan.
                </p>
              </div>

              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-neutral lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white text-primary">
                  Ads
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Control your ad spend and generate more traffic to your
                  products and services.
                </p>
              </div>
              <div>
                <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-neutral lg:h-12 lg:w-12 dark:bg-primary-900">
                  <svg
                    className="w-5 h-5 text-primary lg:w-6 lg:h-6 dark:text-primary-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white text-primary">
                  AR Design
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Create beautiful, creative, gamified, or humorous AR filters
                  in collaboration wth our team.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-gray-900 py-10">
          <div className="py-8  mx-auto max-w-screen-xl lg:py-16 lg:px-2">
            <div className="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
              <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                Powering innovation to reach
                <span className="font-extrabold"> millions+</span> users
                worldwide
              </h2>
              <p className="mb-4 font-light">
                Capitalize on the future of marketing with modern social media
                platforms and cutting edge AR tools. Contact our team today and
                bolster your brand presence across the highest utilized social
                media applications.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
