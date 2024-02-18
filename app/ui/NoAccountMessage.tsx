interface NoAccountMessageProps {
    action: string;
  }
  

const NoAccountMessage: React.FC<NoAccountMessageProps> = ({ action }) => {
    return (
        <div className="flex flex-col justify-center items-center h-screen mx-4 p-2 text-center">
            <div className="text-white text-lg mb-4">
                Please log in an upstox account to {action}.
            </div>
            <div>
                <a href="/dashboard/accounts" className="text-blue-400 hover:text-blue-500">
                    Click here to go to accounts.
                </a>
            </div>
        </div>
    );
};

export default NoAccountMessage;
