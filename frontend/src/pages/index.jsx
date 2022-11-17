import BaseLayout from "../common/layouts/BaseLayout";

export default function Home() {
  return (
    <>
      <BaseLayout title="Product Feedback | Home" content="Homepage">
        <div className="hero h-[calc(100vh-64px)] bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Home Page</h1>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
