"""
feature_extraction.py
Extracts the 9 URL-computable features that match the phishing dataset.
Feature order and column names MUST match what the model was trained on.
"""
import re
from urllib.parse import urlparse
import pandas as pd

SHORTENERS = {
    'bit.ly','goo.gl','tinyurl.com','ow.ly','t.co','is.gd','buff.ly',
    'adf.ly','bit.do','mcaf.ee','su.pr','twit.ac','shorte.st','rb.gy',
    'cutt.ly','shorturl.at','tiny.cc'
}

FEATURE_COLS = [
    'having_IPhaving_IP_Address ',
    'URLURL_Length ',
    'Shortining_Service ',
    'having_At_Symbol ',
    'double_slash_redirecting ',
    'Prefix_Suffix ',
    'having_Sub_Domain ',
    'HTTPS_token ',
    'port ',
]

def extract_features(url: str) -> pd.DataFrame:
    """
    Returns a single-row DataFrame with the 9 URL-computable features.
    Encoding: 1 = phishing indicator, -1 = legitimate indicator, 0 = suspicious
    """
    parsed = urlparse(url)
    domain = (parsed.netloc or '').lower()
    domain_no_port = domain.split(':')[0]
    path = parsed.path

    # 1. IP address in URL hostname
    ip_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
    has_ip = bool(re.match(ip_pattern, domain_no_port))
    f1 = 1 if has_ip else -1

    # 2. URL length  (< 54 = legit, 54-75 = suspicious, > 75 = phishing)
    url_len = len(url)
    if url_len < 54:
        f2 = -1
    elif url_len <= 75:
        f2 = 0
    else:
        f2 = 1

    # 3. URL shortening service
    is_short = any(s in domain_no_port for s in SHORTENERS)
    f3 = 1 if is_short else -1

    # 4. @ symbol
    f4 = 1 if '@' in url else -1

    # 5. Double slash in path (redirect)
    f5 = 1 if '//' in path else -1

    # 6. Dash/prefix-suffix in domain
    f6 = 1 if '-' in domain_no_port else -1

    # 7. Sub-domain depth (dot count)
    dot_count = domain_no_port.count('.')
    if dot_count <= 1:
        f7 = -1   # e.g. google.com
    elif dot_count == 2:
        f7 = 0    # e.g. www.google.com
    else:
        f7 = 1    # e.g. login.secure.google.com.evil.net

    # 8. "https" token used inside domain name (phishing trick)
    f8 = 1 if 'https' in domain_no_port else -1

    # 9. Non-standard port in URL
    port = parsed.port
    if port is None or str(port) in {'80', '443'}:
        f9 = -1
    else:
        f9 = 1

    row = [f1, f2, f3, f4, f5, f6, f7, f8, f9]
    return pd.DataFrame([row], columns=FEATURE_COLS)