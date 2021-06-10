INSERT INTO [dbo].[EmployeeInfo]
    (
        [FirstName],
        [LastName],
        [Birthdate]
    )
VALUES 
    (
        @FirstName,
        @LastName,
        @Birthdate
  
    )

SELECT SCOPE_IDENTITY() AS EmployeeID