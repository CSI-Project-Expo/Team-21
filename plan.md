Phishing Website Detection – Implementation Plan

Team Name

Horizon Four

Project Domain

Cybersecurity (Phishing & Web Threat Detection)

Project Overview

Phishing attacks are one of the most common cybersecurity threats, where attackers create fake websites that mimic legitimate services (such as banks, social media, or e‑commerce platforms) to steal user credentials and sensitive information.

This project focuses on building a cybersecurity-focused phishing detection tool that analyzes a given website URL and predicts whether it is phishing or legitimate. The system uses machine learning techniques to automate threat detection and provide quick risk assessment to users.

Machine learning is used as a technique, while the core problem being solved belongs to cybersecurity—specifically web security and cyber threat prevention.



Problem Statement

Users often find it difficult to identify fake or malicious websites. Traditional blacklist-based approaches fail to detect newly created phishing sites. There is a need for an intelligent system that can analyze website characteristics and detect phishing attempts in real time.


---

Proposed Solution

The proposed system allows a user to input a suspicious website URL. The backend extracts security-related features from the URL and passes them to a trained machine learning model. The model predicts whether the website is phishing or legitimate. The result, along with relevant details, is stored in the database and displayed to the user.


Tech Stack

Backend: Python, Flask

Frontend: HTML, CSS, JavaScript / Streamlit

Machine Learning: Scikit-learn (Random Forest Classifier)

Database: MongoDB

Tools & Libraries: Pandas, NumPy, PyMongo



System Architecture

1. User enters a website URL through the web interface.


2. Backend receives the URL and performs feature extraction.


3. Extracted features are passed to the trained ML model.


4. The model predicts whether the URL is phishing or legitimate.


5. The result and metadata are stored in MongoDB.


6. The prediction result is displayed to the user.



Feature Extraction

The following cybersecurity-related features are extracted from the URL:

URL length

Presence of HTTPS

Number of dots in the URL

Presence of IP address in URL

Count of special characters

Number of subdomains


These features help identify suspicious patterns commonly used in phishing attacks.



Machine Learning Model

Algorithm Used: Random Forest Classifier

Reason for Selection:

High accuracy for classification problems

Reduces overfitting by combining multiple decision trees

Works well with structured feature-based data

Easy to interpret and explain



The model is trained on a labeled phishing URL dataset and saved for use in real-time predictions.



Database Design (MongoDB)

MongoDB is used to store phishing detection results due to its flexibility and ability to handle semi-structured data.

Collection: scan_results

URL

Extracted features

Prediction result (Phishing / Legitimate)

Confidence score

Timestamp of scan



Backend Responsibilities

URL feature extraction

Machine learning model integration

API development for URL scanning

Database interaction using MongoDB

Handling user requests and responses



Security Perspective

This project contributes to cybersecurity by:

Detecting phishing websites

Preventing credential theft

Providing automated cyber threat detection

Enhancing web security awareness



Implementation Timeline

Week 1: Dataset collection and feature extraction

Week 2: Model training and evaluation

Week 3: Backend and database integration

Week 4: Frontend integration and testing



Expected Outcome

A web-based cybersecurity tool for phishing detection

Accurate classification of malicious and legitimate websites

Secure storage of scan history

Improved user awareness of cyber threats



Conclusion

The Phishing Website Detection Tool is a cybersecurity-focused project that leverages machine learning to automate the detection of malicious websites. By combining web security concepts with intelligent classification techniques, the system provides an effective solution to a real-world cyber threat.
