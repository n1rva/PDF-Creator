export const UploadBtn = ({ onChange }) => (
  <>
    <label
      className="inline-flex justify-center h-10 w-full rounded-md py-2 bg-primary text-white text-center font-medium cursor-pointer hover:bg-third hover:text-primary hover:border-primary"
      htmlFor="imageFile"
    >
      <svg
        className="h-6 pr-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        ></path>
      </svg>
      Upload Image
    </label>
    <input
      className="hidden cursor-pointer bg-black focus:outline-none text-gray-500 rounded-sm"
      id="imageFile"
      type="file"
      accept="image/*"
      onChange={onChange}
    />
  </>
);

export const DownSm = ({ disabled, onClick }) => (
  <>
    <button
      className="inline-flex items-center h-10 rounded-md py-2 px-3 bg-primary text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-forth disabled:text-white hover:bg-third hover:text-primary"
      disabled={disabled}
      onClick={onClick}
    >
      <svg
        className="w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        ></path>
      </svg>
    </button>
  </>
);

export const DownSmLoading = () => (
  <button className="inline-flex items-center h-10 rounded-md py-2 px-3 bg-primary text-white cursor-pointer">
    <div className="flex items-center justify-center w-6 ">
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mx-2 text-gray-200 animate-spin fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </button>
);

export const DataOpt = ({ disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="inline-flex justify-center h-10 w-9/12 rounded-md py-2 bg-primary text-white text-center font-medium cursor-pointer hover:bg-third hover:text-primary hover:border-primary disabled:cursor-not-allowed disabled:bg-forth disabled:text-white"
  >
    Data Options
  </button>
);

export const DownMd = ({ disabled, onClick }) => (
  <button
    disabled={disabled}
    onClick={onClick}
    className="inline-flex h-10 disabled:cursor-not-allowed disabled:bg-forth disabled:hover:text-white text-center font-medium rounded-md py-2 pr-4 bg-primary text-white cursor-pointer hover:bg-third hover:text-primary"
  >
    <div className="flex items-center justify-center w-12 ">
      <svg
        className="h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
        ></path>
      </svg>
    </div>
    Download
  </button>
);

export const DownMdLoading = () => (
  <button className="inline-flex h-10 text-center font-medium rounded-md py-2 pr-4 bg-primary border border-gray-500 text-white cursor-pointer">
    <div className="flex items-center justify-center w-12 ">
      <div role="status">
        <svg
          aria-hidden="true"
          className="h-6 text-gray-200 animate-spin fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    Loading...
  </button>
);

export const Font = ({ onChange }) => (
  <>
    <label
      className="inline-flex items-center h-10 rounded-md py-2 px-3 bg-primary text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-forth disabled:text-white hover:bg-third hover:text-primary"
      htmlFor="font"
    >
      <svg
        className="w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
        ></path>
      </svg>
    </label>
    <input
      className="hidden cursor-pointer bg-black focus:outline-none text-gray-500 rounded-sm"
      id="font"
      type="file"
      accept=".ttf,.otf,.woff,.woff2"
      onChange={onChange}
    />
  </>
);

export const CloseBtn = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-forth bg-transparent hover:bg-forth hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    data-modal-hide="defaultModal"
  >
    <svg
      aria-hidden="true"
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span className="sr-only">Close modal</span>
  </button>
);
