import React from 'react';

interface AddUserPopupProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    userData: { name: string; upstoxId: string; apiKey: string; apiSecret: string };
    onUserDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddUserPopup: React.FC<AddUserPopupProps> = ({
    onClose,
    onSubmit,
    userData,
    onUserDataChange
}) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
                <button onClick={onClose} className="float-right font-bold">X</button>
                <form onSubmit={onSubmit} className="clear-both">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={onUserDataChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="upstoxId" className="block text-gray-700 text-sm font-bold mb-2">Upstox ID:</label>
                        <input
                            type="text"
                            id="upstoxId"
                            name="upstoxId"
                            value={userData.upstoxId}
                            onChange={onUserDataChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Upstox ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apiKey" className="block text-gray-700 text-sm font-bold mb-2">API Key:</label>
                        <input
                            type="text"
                            id="apiKey"
                            name="apiKey"
                            value={userData.apiKey}
                            onChange={onUserDataChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="API Key"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="apiSecret" className="block text-gray-700 text-sm font-bold mb-2">API Secret:</label>
                        <input
                            type="password"
                            id="apiSecret"
                            name="apiSecret"
                            value={userData.apiSecret}
                            onChange={onUserDataChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="API Secret"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddUserPopup;
