# client-openai

***Note: This package is currently in early development and may not be fully functional. Use at your own risk.***

This is a **NodeJS-native** client for the OpenAI API. It is designed to be simple and easy to use, while also providing a powerful interface for interacting with the API.

This package is built without any external dependencies, making it lightweight and easy to integrate into any NodeJS project.

## Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the package, run the following command in the directory of your project:

```bash
npm install client-openai
```

## Usage

Once installed, import the client and create an instance with your OpenAI API key:

```javascript
import OpenAIClient from 'client-openai';

const client = new OpenAIClient('your-api-key-here');
```

For safety reasons, remember to always keep your API key separate from your codebase, such as in environment variables. You can use the [dotenv](https://npmjs.com/package/dotenv) package to manage your environment variables.

## Contributing

Contributions to this project are welcome! If you have any ideas for improvements or new features, please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.