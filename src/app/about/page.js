export const metadata = {
  title: 'About Us - Image Converter',
  description: 'Learn about our mission to provide fast, secure, and free image conversion tools.',
};

export default function About() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="prose dark:prose-invert">
        <p>
          We built Image Converter with a simple mission: <strong>Privacy First.</strong>
        </p>
        <p>
          Most online converters upload your files to a cloud server to process them. 
          This is slow, requires bandwidth, and poses a privacy risk. 
          We utilize modern browser technologies (WebAssembly and HTML5 Canvas) to process 
          your images directly on your device.
        </p>
        <h3>Why choose us?</h3>
        <ul>
          <li>Zero Server Uploads (Files stay on your computer)</li>
          <li>Unlimited Batch Conversions</li>
          <li>No Registration Required</li>
        </ul>
      </div>
    </div>
  );
}