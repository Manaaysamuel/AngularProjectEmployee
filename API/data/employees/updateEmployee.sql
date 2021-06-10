UPDATE [dbo].[EmployeeInfo]
SET [FirstName]=@FirstName,
    [LastName]=@LastName,
    [Birthdate]=@Birthdate
WHERE [EmployeeID]=@EmployeeID

SELECT [EmployeeID]
      ,[FirstName]
      ,[LastName]
      ,[Birthdate]
  FROM [dbo].[EmployeeInfo]
  WHERE [EmployeeID]=@EmployeeID