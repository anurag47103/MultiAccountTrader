const InstructionList = () => (
    <div className='text-gray-800 mt-20 dark:bg-gray-800 shadow-2xl rounded-lg p-8 border border-gray-300 dark:border-gray-700 mx-auto w-full md:max-w-4xl'>
      <ol className='list-decimal list-inside space-y-2 text-white text-sm'>
        <li>Visit <a href="https://account.upstox.com/developer/apps" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">Upstox Developer Apps</a> and click &quot;New App&quot;.</li>
        <li>Enter <code className="bg-gray-700 text-white p-1 rounded">{'https://mab-server.lol/api/v1/auth/authCallback'}</code> as the Redirect URL.</li>
        <li>Name your app and click &quot;Continue&quot;.</li>
        <li>Copy the API Key and Secret provided.</li>
        <li>Come back to this page to add a new user with these credentials.</li>
      </ol>
    </div>
  );
  
  export default InstructionList;
  