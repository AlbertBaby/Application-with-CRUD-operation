# REST Assured API Testing Framework

This framework provides automated testing capabilities for testing REST APIs using REST Assured, TestNG, and Allure Reports.

## Prerequisites

- Java JDK 11 or higher
- Maven 3.6.3 or higher
- Backend server running at `http://localhost:3000`

## Project Structure

```
RestAssured/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── automation/
│   │               └── models/           # POJO classes
│   │                   ├── User.java
│   │                   └── Product.java
│   └── test/
│       ├── java/
│       │   └── com/
│       │       └── automation/
│       │           ├── config/          # Framework configuration
│       │           │   └── TestConfig.java
│       │           └── tests/           # Test classes
│       │               ├── UserApiTest.java
│       │               └── ProductApiTest.java
│       └── resources/
│           ├── config.properties        # Configuration properties
│           └── testng.xml              # TestNG suite configuration
└── pom.xml                             # Maven configuration
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/AlbertBaby/Application-with-CRUD-operation.git
cd Application-with-CRUD-operation/RestAssured
```

2. Install dependencies:
```bash
mvn clean install
```

3. Ensure your backend server is running at `http://localhost:3000`

## Running Tests

### Running All Tests
To run all tests in the suite:
```bash
mvn clean test
```

### Running Specific Test Classes
To run a specific test class:
```bash
mvn test -Dtest=UserApiTest
```
or
```bash
mvn test -Dtest=ProductApiTest
```

## Viewing Test Reports

### Allure Reports
1. Generate and open Allure report:
```bash
mvn allure:serve
```
This will generate the report and automatically open it in your default browser.

2. Generate report without opening:
```bash
mvn allure:report
```
The report will be generated in `target/site/allure-maven-plugin/`

### TestNG Reports
After test execution, TestNG reports can be found at:
- `target/surefire-reports/index.html`
- `target/surefire-reports/emailable-report.html`

## Configuration

The framework configuration is maintained in `src/test/resources/config.properties`:
```properties
base.url=http://localhost:2000
```

To modify the base URL or API version, update these properties accordingly.

## Available Tests

### User API Tests
- User Registration
- User Login

### Product API Tests
- Create Product
- Get All Products

## Adding New Tests

1. Create new POJO classes in `src/main/java/com/automation/models/` if needed
2. Create new test classes in `src/test/java/com/automation/tests/`
3. Add the new test classes to `testng.xml`

## Troubleshooting

1. If tests fail with connection refused:
   - Ensure the backend server is running
   - Verify the base URL in `config.properties`

2. If Maven build fails:
   - Ensure JAVA_HOME is set correctly
     ```
