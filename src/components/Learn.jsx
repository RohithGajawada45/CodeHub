import React, { useRef } from 'react';

const Learn = () => {
    // Create refs for each section
    const hostingProviderRef = useRef(null);
    const authenticationRef = useRef(null);
    const bitbucketRef = useRef(null);
    const ownGitServerRef = useRef(null);
    const linksLiteratureRef = useRef(null);

    // Scroll to section function
    const scrollToSection = (ref) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Copy code to clipboard function
    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                alert('Code copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-blue-1000 to-blue-1000">
            <nav className="w-1/4 bg-[#0d0d2b] text-gray-800 shadow-lg p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center text-white">CodeHub Learnings</h1>

                {/* Table of Contents Section */}
                <h2 className="text-lg font-semibold mb-2 border-b-2 border-blue-300 pb-2 text-white">Table of Contents</h2>
                <ul className="list-disc list-inside space-y-2 text-white">
                    <li>
                        <a href="#hosting-provider" onClick={() => scrollToSection(hostingProviderRef)} className="hover:underline cursor-pointer">
                            1. Git Hosting Provider
                        </a>
                    </li>
                    <li>
                        <a href="#authentication" onClick={() => scrollToSection(authenticationRef)} className="hover:underline cursor-pointer">
                            2. Authentication via SSH
                        </a>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>
                                <a href="#concept-ssh" onClick={() => scrollToSection(authenticationRef)} className="hover:underline cursor-pointer">
                                    2.1. The concept of SSH
                                </a>
                            </li>
                            <li>
                                <a href="#ssh-key" onClick={() => scrollToSection(authenticationRef)} className="hover:underline cursor-pointer">
                                    2.2. SSH key pair generation
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#bitbucket" onClick={() => scrollToSection(bitbucketRef)} className="hover:underline cursor-pointer">
                            3. Bitbucket
                        </a>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>
                                <a href="#what-bitbucket" onClick={() => scrollToSection(bitbucketRef)} className="hover:underline cursor-pointer">
                                    3.1. What is Bitbucket?
                                </a>
                            </li>
                            <li>
                                <a href="#create-repo" onClick={() => scrollToSection(bitbucketRef)} className="hover:underline cursor-pointer">
                                    3.2. Creating a repository
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#own-git-server" onClick={() => scrollToSection(ownGitServerRef)} className="hover:underline cursor-pointer">
                            4. Own Git server
                        </a>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>
                                <a href="#hosting-git-server" onClick={() => scrollToSection(ownGitServerRef)} className="hover:underline cursor-pointer">
                                    4.1. Hosting your own Git server
                                </a>
                            </li>
                            <li>
                                <a href="#write-access" onClick={() => scrollToSection(ownGitServerRef)} className="hover:underline cursor-pointer">
                                    4.2. Give write access to a Git repository
                                </a>
                            </li>
                            <li>
                                <a href="#security-setup" onClick={() => scrollToSection(ownGitServerRef)} className="hover:underline cursor-pointer">
                                    4.3. Security setup for the git user
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a href="#links-literature" onClick={() => scrollToSection(linksLiteratureRef)} className="hover:underline cursor-pointer">
                            5. Links and Literature
                        </a>
                        <ul className="list-disc list-inside ml-4 space-y-1">
                            <li>
                                <a href="#vogella-examples" onClick={() => scrollToSection(linksLiteratureRef)} className="hover:underline cursor-pointer">
                                    5.1. vogella Java example code
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {/* Main content */}
            <main className="flex-1 p-8 bg-white rounded-lg shadow-md mx-6">
                <h1 className="text-4xl font-semibold mb-4 text-blue-600">Welcome to CodeHub Learnings</h1>

                {/* Main tutorial content */}
                <section className="mb-8" ref={hostingProviderRef} id="hosting-provider">
                    <h2 className="text-3xl font-semibold mb-3 text-blue-500">Hosting Your Git Repositories</h2>
                    <p className="mb-4">
                        This tutorial explains how to use Bitbucket as a hosting provider for your Git repository and how you can install a Git server on your own machine. Learn more in the Learning Portal. Check out our Git Online Training High Priority.
                    </p>
                </section>

                <section className="mb-8" ref={authenticationRef} id="authentication">
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">1. Git Hosting Provider</h3>
                    <p className="mb-4">
                        Git allows you to host your own Git server. Instead of setting up your own server, you can also use a hosting service. The most popular Git hosting sites are GitHub and Bitbucket. Both offer free hosting with certain limitations.
                    </p>
                </section>

                <section className="mb-8" ref={bitbucketRef} id="bitbucket">
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">2. Authentication via SSH</h3>
                    <h4 className="font-semibold mt-4" id="concept-ssh">2.1. The concept of SSH</h4>
                    <p className="mb-4">
                        Most Git (and Gerrit) servers support SSH-based authentication. This requires an SSH key pair for automatic authentication. An SSH key pair consists of a public and private key. The public key is uploaded to the application you want to authenticate with. The application has no access to the private key. If you interact with the hosting provider via the SSH protocol, the public key is used to identify a user who encrypted the data during communication with the corresponding private key.
                    </p>

                    <h4 className="font-semibold mt-4" id="ssh-key">2.2. SSH key pair generation</h4>
                    <p className="mb-4">
                        To create an SSH key under Linux (or Windows/Mac with OpenSSH installed), switch to the command line and execute the following commands. The generated SSH key is by default located in the .ssh directory of the user home directory. Ensure that you back up existing keys in this directory before running the following commands.
                    </p>
                    <div className="relative mb-4">
                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto shadow-inner">
                            {`# Switch to your .ssh directory
cd ~/.ssh

# If the directory does not exist, create it via:
# mkdir .ssh

# Manually backup all existing content of this dir!!!

# Afterwards generate the ssh key
ssh-keygen -t rsa -b 4096 -C "your_email@youremail.com"

# Press enter to select the default directory
# You will be prompted for an optional passphrase
# A passphrase protects your private key
# but you have to enter it manually during ssh operations`}
                        </pre>
                        <button
                            onClick={() => copyToClipboard(`# Switch to your .ssh directory\ncd ~/.ssh\n\n# If the directory does not exist, create it via:\n# mkdir .ssh\n\n# Manually backup all existing content of this dir!!!\n\n# Afterwards generate the ssh key\nssh-keygen -t rsa -b 4096 -C "your_email@youremail.com"\n\n# Press enter to select the default directory\n# You will be prompted for an optional passphrase\n# A passphrase protects your private key\n# but you have to enter it manually during ssh operations`)}
                            className="absolute top-3 right-3 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                        >
                            Copy
                        </button>
                    </div>

                    <h3 className="font-semibold mt-4">2.3. Add SSH key to your Git hosting provider</h3>
                    <p className="mb-4">
                        After generating the SSH key pair, you must add the public key to your Git hosting provider's settings. This process may vary slightly depending on the provider.
                    </p>
                </section>

                <section className="mb-8" ref={bitbucketRef} id="bitbucket">
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">3. Bitbucket</h3>
                    <h4 className="font-semibold mt-4" id="what-bitbucket">3.1. What is Bitbucket?</h4>
                    <p className="mb-4">
                        Bitbucket is a popular Git hosting provider that provides both public and private repositories. It offers features such as issue tracking, project management, and CI/CD integration.
                    </p>

                    <h4 className="font-semibold mt-4" id="create-repo">3.2. Creating a repository</h4>
                    <p className="mb-4">
                        To create a repository, log in to Bitbucket, click on the <strong>Create Repository</strong> button, fill in the required details, and your repository will be set up instantly.
                    </p>
                </section>

                <section className="mb-8" ref={ownGitServerRef} id="own-git-server">
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">4. Own Git Server</h3>
                    <h4 className="font-semibold mt-4" id="hosting-git-server">4.1. Hosting your own Git server</h4>
                    <p className="mb-4">
                        As described before, you do not need a server. You can just use a file system or a public Git provider, such as GitHub or Bitbucket. Sometimes, however, it is convenient to have your own server, and installing it under Ubuntu is relatively easy.
                    </p>
                    <div className="relative mb-4">
                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto shadow-inner">
                            {`# Make sure you have installed the SSH tooling.
sudo apt-get install ssh

# If you have not yet installed Git on your server, you need to do this too.
sudo apt-get install git-core

# Create a new user and set a password for the Git system.
sudo adduser git

# Login to server
# to test use localhost
ssh git@IP_ADDRESS_OF_SERVER

# Create repository
git init --bare example.git`}
                        </pre>
                        <button
                            onClick={() => copyToClipboard(`# Make sure you have installed the SSH tooling.\nsudo apt-get install ssh\n\n# If you have not yet installed Git on your server, you need to do this too.\nsudo apt-get install git-core\n\n# Create a new user and set a password for the Git system.\nsudo adduser git\n\n# Login to server\n# to test use localhost\nssh git@IP_ADDRESS_OF_SERVER\n\n# Create repository\ngit init --bare example.git`)}
                            className="absolute top-3 right-3 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                        >
                            Copy
                        </button>
                    </div>
                    <p className="mb-4">
                        Now you can push to the remote repository.
                    </p>
                    <div className="relative mb-4">
                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto shadow-inner">
                            {`mkdir gitexample
cd gitexample
git init
touch README
git add README
git commit -m "initial commit"
git remote add origin ssh://git@YOUR_IP/example.git
git push -u origin master`}
                        </pre>
                        <button
                            onClick={() => copyToClipboard(`mkdir gitexample\ncd gitexample\ngit init\ntouch README\ngit add README\ngit commit -m "initial commit"\ngit remote add origin ssh://git@YOUR_IP/example.git\ngit push -u origin master`)}
                            className="absolute top-3 right-3 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                        >
                            Copy
                        </button>
                    </div>

                    <h4 className="font-semibold mt-4" id="write-access">4.2. Give write access to a Git repository</h4>
                    <p className="mb-4">
                        Once you have set up the repository, you will also want to allow others to write to this repository. The easiest way to do this is to give a user permission to write to the Git repository.
                    </p>
                    <div className="relative mb-4">
                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto shadow-inner">
                            {`# Change the ownership of the directory to the git user
sudo chown -R git:git /path/to/repo.git`}
                        </pre>
                        <button
                            onClick={() => copyToClipboard(`# Change the ownership of the directory to the git user\nsudo chown -R git:git /path/to/repo.git`)}
                            className="absolute top-3 right-3 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                        >
                            Copy
                        </button>
                    </div>
                    
                    <h4 className="font-semibold mt-4" id="security-setup">4.3. Security setup for the git user</h4>
                    <p className="mb-4">
                        The Git user can have a shell assigned to it. For increased security, the shell <code>/usr/bin/git-shell</code> can be assigned to the Git user via the <code>/etc/passwd</code> configuration file. If you assign this shell to the Git user, this user can also perform Git commands, which adds safety to your Git setup.
                    </p>
                </section>

                <section ref={linksLiteratureRef} id="links-literature">
                    <h3 className="text-2xl font-semibold mt-6 mb-2 text-blue-600">5. Links and Literature</h3>
                    <p className="mb-4">
                        Visit the Git homepage for more information and resources. Additional examples can be found in the vogella Java example code section.
                    </p>

                    <h4 className="font-semibold mt-4" id="vogella-examples">5.1. vogella Java example code</h4>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Java Source examples</li>
                        <li>Eclipse code examples</li>
                        <li>Eclipse RCP code examples</li>
                        <li>Eclipse IDE extensions code examples</li>
                        <li>Maven code examples</li>
                        <li>JUnit / Java testing code examples</li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default Learn;
