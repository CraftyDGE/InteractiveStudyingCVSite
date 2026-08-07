import os
import sys
import paramiko

def read_credentials():
    cred_file = r"C:\Users\deyan\Downloads\interactive-studying-credentials.txt"
    host, port, username, password = "185.45.66.104", 1022, "intejcvp", ""
    with open(cred_file, 'r', encoding='utf-8') as f:
        for line in f:
            if "Password:" in line and "d_HrRc" in line:
                password = line.split("Password:")[1].strip()
    return host, port, username, password

def upload_site():
    host, port, username, password = read_credentials()
    local_dir = r"C:\Users\deyan\.gemini\antigravity\scratch\InteractiveStudyingCVSite"
    remote_dirs = ["public_html", "interactivestudying.eu", "cv.interactivestudying.eu"]

    print(f"Connecting SFTP to {host}:{port}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, port=port, username=username, password=password, timeout=15)
    sftp = ssh.open_sftp()

    files_to_upload = [f for f in os.listdir(local_dir) if os.path.isfile(os.path.join(local_dir, f)) and not f.startswith('.git/')]

    for rdir in remote_dirs:
        try:
            sftp.mkdir(rdir)
        except Exception:
            pass
        print(f"\n--- Uploading files to remote path: {rdir} ---")
        for filename in files_to_upload:
            local_path = os.path.join(local_dir, filename)
            remote_path = f"{rdir}/{filename}"
            print(f"Uploading {filename} -> {remote_path} ...")
            sftp.put(local_path, remote_path)

    sftp.close()
    ssh.close()
    print("\nSFTP Deployment Complete across main domain and subdomains.")

if __name__ == "__main__":
    upload_site()
