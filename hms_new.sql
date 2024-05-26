
CREATE DATABASE [Healthcare_Management_System]
USE [Healthcare_Management_System]
CREATE TABLE [dbo].[Admin](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[OfficeLocation] [varchar](100) NULL,
	[JoinDate] [date] NOT NULL,
	[Salary] [decimal](10, 2) NULL,
	[Notes] [varchar](max) NULL,
	[PersonID] [int] NOT NULL,
 CONSTRAINT [PK__Admin__719FE4E89D6A3299] PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Department]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentID] [int] IDENTITY(1,1) NOT NULL,
	[HospitalID] [int] NULL,
	[Name] [varchar](100) NOT NULL,
	[Location] [varchar](100) NULL,
	[Contact] [varchar](15) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DepartmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Doctor]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Doctor](
	[DoctorID] [int] IDENTITY(1,1) NOT NULL,
	[Qualification] [varchar](100) NOT NULL,
	[Specialization] [varchar](100) NOT NULL,
	[Experience] [int] NOT NULL,
	[LicenseNumber] [varchar](50) NULL,
	[CheckupStatus] [int] NOT NULL,
	[ConsultationFee] [decimal](10, 2) NOT NULL,
	[PersonID] [int] NOT NULL,
 CONSTRAINT [PK__Doctor__2DC00EDFE6C691D7] PRIMARY KEY CLUSTERED 
(
	[DoctorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoctorDepartmentAssignment]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoctorDepartmentAssignment](
	[DoctorID] [int] NULL,
	[DepartmentID] [int] NULL,
	[AssignmentDate] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoctorPatientVisit]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoctorPatientVisit](
	[DoctorID] [int] NULL,
	[PatientID] [int] NULL,
	[DateAssigned] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Hospital]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Hospital](
	[HospitalID] [int] IDENTITY(1,1) NOT NULL,
	[AdminID] [int] NULL,
	[Name] [varchar](100) NOT NULL,
	[Location] [varchar](100) NULL,
	[Website] [varchar](100) NULL,
	[Email] [varchar](50) NOT NULL,
	[Contact] [varchar](15) NOT NULL,
	[ZipCode] [varchar](10) NULL,
	[State] [varchar](50) NULL,
	[City] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[HospitalID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Invoice](
	[InvoiceID] [int] IDENTITY(1,1) NOT NULL,
	[PrescriptionID] [int] NULL,
	[TotalAmount] [decimal](10, 2) NOT NULL,
	[PaymentStatus] [int] NOT NULL,
	[DateIssued] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[InvoiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Lookup]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Lookup](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Value] [varchar](100) NOT NULL,
	[Category] [varchar](50) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Medicine]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Medicine](
	[MedicineID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NOT NULL,
	[Description] [varchar](max) NULL,
	[Manufacturer] [varchar](100) NOT NULL,
	[Price] [decimal](10, 2) NOT NULL,
	[Dosage] [varchar](50) NULL,
	[Quantity] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[MedicineID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Patient]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Patient](
	[PatientID] [int] IDENTITY(1,1) NOT NULL,
	[Weight] [decimal](5, 2) NULL,
	[BloodPressure] [varchar](20) NULL,
	[Height] [decimal](5, 2) NULL,
	[Allergies] [varchar](100) NULL,
	[AliveStatus] [int] NOT NULL,
	[BloodType] [varchar](10) NULL,
	[MedicalHistory] [varchar](max) NOT NULL,
	[PersonID] [int] NOT NULL,
 CONSTRAINT [PK__PatientR__970EC346A043FB9F] PRIMARY KEY CLUSTERED 
(
	[PatientID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatientSymptoms]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatientSymptoms](
	[SymptomsID] [int] IDENTITY(1,1) NOT NULL,
	[PatientID] [int] NOT NULL,
	[DateRecorded] [datetime] NOT NULL,
	[Description] [varchar](max) NOT NULL,
 CONSTRAINT [PK__PatientS__D26F2AE6AC9EF618] PRIMARY KEY CLUSTERED 
(
	[SymptomsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatientTreatment]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatientTreatment](
	[TreatmentID] [int] IDENTITY(1,1) NOT NULL,
	[SymptomID] [int] NULL,
	[DoctorID] [int] NULL,
	[Diagnosis] [varchar](max) NOT NULL,
	[TreatmentPlan] [varchar](max) NULL,
	[CaseType] [int] NOT NULL,
	[DateStarted] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[TreatmentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Person]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Person](
	[UserID] [int] NOT NULL,
	[FirstName] [varchar](20) NOT NULL,
	[LastName] [varchar](40) NOT NULL,
	[Gender] [int] NOT NULL,
	[Address] [varchar](100) NULL,
	[CNIC] [varchar](20) NULL,
	[Contact] [varchar](15) NULL,
	[Email] [varchar](50) NOT NULL,
	[DateOfBirth] [date] NOT NULL,
	[ZipCode] [varchar](10) NULL,
	[State] [varchar](50) NULL,
	[PersonID] [int] IDENTITY(1,1) NOT NULL,
	[Img] [varbinary](max) NULL,
 CONSTRAINT [PK_Person] PRIMARY KEY CLUSTERED 
(
	[PersonID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Prescription]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Prescription](
	[PrescriptionID] [int] IDENTITY(1,1) NOT NULL,
	[MedicineID] [int] NULL,
	[TreatmentID] [int] NULL,
	[DosageTime] [varchar](50) NULL,
	[DosageDuration] [varchar](50) NOT NULL,
	[DosageQuantity] [int] NOT NULL,
	[DatePrescribed] [datetime] NOT NULL,
	[Advice] [varchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[PrescriptionID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 4/23/2024 3:03:29 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [nvarchar](255) NULL,
	[Role] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admin]  WITH CHECK ADD  CONSTRAINT [FK_Admin_PersonID] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Person] ([PersonID])
GO
ALTER TABLE [dbo].[Admin] CHECK CONSTRAINT [FK_Admin_PersonID]
GO
ALTER TABLE [dbo].[Department]  WITH CHECK ADD FOREIGN KEY([HospitalID])
REFERENCES [dbo].[Hospital] ([HospitalID])
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_Lookup] FOREIGN KEY([CheckupStatus])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_Lookup]
GO
ALTER TABLE [dbo].[Doctor]  WITH CHECK ADD  CONSTRAINT [FK_Doctor_PersonID] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Person] ([PersonID])
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [FK_Doctor_PersonID]
GO
ALTER TABLE [dbo].[DoctorDepartmentAssignment]  WITH CHECK ADD FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[DoctorDepartmentAssignment]  WITH CHECK ADD  CONSTRAINT [FK__DoctorDep__Docto__5535A963] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[Doctor] ([DoctorID])
GO
ALTER TABLE [dbo].[DoctorDepartmentAssignment] CHECK CONSTRAINT [FK__DoctorDep__Docto__5535A963]
GO
ALTER TABLE [dbo].[DoctorDepartmentAssignment]  WITH CHECK ADD  CONSTRAINT [FK_Department_Assignment] FOREIGN KEY([DepartmentID])
REFERENCES [dbo].[Department] ([DepartmentID])
GO
ALTER TABLE [dbo].[DoctorDepartmentAssignment] CHECK CONSTRAINT [FK_Department_Assignment]
GO
ALTER TABLE [dbo].[DoctorPatientVisit]  WITH CHECK ADD  CONSTRAINT [FK__DoctorPat__Docto__571DF1D5] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[Doctor] ([DoctorID])
GO
ALTER TABLE [dbo].[DoctorPatientVisit] CHECK CONSTRAINT [FK__DoctorPat__Docto__571DF1D5]
GO
ALTER TABLE [dbo].[DoctorPatientVisit]  WITH CHECK ADD  CONSTRAINT [FK__DoctorPat__Patie__5812160E] FOREIGN KEY([PatientID])
REFERENCES [dbo].[Patient] ([PatientID])
GO
ALTER TABLE [dbo].[DoctorPatientVisit] CHECK CONSTRAINT [FK__DoctorPat__Patie__5812160E]
GO
ALTER TABLE [dbo].[Hospital]  WITH CHECK ADD  CONSTRAINT [FK__Hospital__AdminI__59063A47] FOREIGN KEY([AdminID])
REFERENCES [dbo].[Admin] ([AdminID])
GO
ALTER TABLE [dbo].[Hospital] CHECK CONSTRAINT [FK__Hospital__AdminI__59063A47]
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD FOREIGN KEY([PrescriptionID])
REFERENCES [dbo].[Prescription] ([PrescriptionID])
GO
ALTER TABLE [dbo].[Invoice]  WITH CHECK ADD  CONSTRAINT [FK_Invoice_Lookup] FOREIGN KEY([PaymentStatus])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[Invoice] CHECK CONSTRAINT [FK_Invoice_Lookup]
GO
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_Patient_PersonID] FOREIGN KEY([PersonID])
REFERENCES [dbo].[Person] ([PersonID])
GO
ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_Patient_PersonID]
GO
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [FK_PatientRecord_Lookup] FOREIGN KEY([AliveStatus])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [FK_PatientRecord_Lookup]
GO
ALTER TABLE [dbo].[PatientSymptoms]  WITH CHECK ADD  CONSTRAINT [FK__PatientSy__Patie__5DCAEF64] FOREIGN KEY([PatientID])
REFERENCES [dbo].[Patient] ([PatientID])
GO
ALTER TABLE [dbo].[PatientSymptoms] CHECK CONSTRAINT [FK__PatientSy__Patie__5DCAEF64]
GO
ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK__PatientTr__Docto__5EBF139D] FOREIGN KEY([DoctorID])
REFERENCES [dbo].[Doctor] ([DoctorID])
GO
ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK__PatientTr__Docto__5EBF139D]
GO
ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK__PatientTr__Sympt__5FB337D6] FOREIGN KEY([SymptomID])
REFERENCES [dbo].[PatientSymptoms] ([SymptomsID])
GO
ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK__PatientTr__Sympt__5FB337D6]
GO
ALTER TABLE [dbo].[PatientTreatment]  WITH CHECK ADD  CONSTRAINT [FK_PatientTreatment_Lookup] FOREIGN KEY([CaseType])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[PatientTreatment] CHECK CONSTRAINT [FK_PatientTreatment_Lookup]
GO
ALTER TABLE [dbo].[Person]  WITH NOCHECK ADD  CONSTRAINT [FK__Person__UserID__619B8048] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
NOT FOR REPLICATION 
GO
ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK__Person__UserID__619B8048]
GO
ALTER TABLE [dbo].[Person]  WITH CHECK ADD  CONSTRAINT [FK_Person_Lookup] FOREIGN KEY([Gender])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [FK_Person_Lookup]
GO
ALTER TABLE [dbo].[Prescription]  WITH CHECK ADD FOREIGN KEY([MedicineID])
REFERENCES [dbo].[Medicine] ([MedicineID])
GO
ALTER TABLE [dbo].[Prescription]  WITH CHECK ADD FOREIGN KEY([TreatmentID])
REFERENCES [dbo].[PatientTreatment] ([TreatmentID])
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Lookup] FOREIGN KEY([Role])
REFERENCES [dbo].[Lookup] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Lookup]
GO
ALTER TABLE [dbo].[Doctor]  WITH NOCHECK ADD  CONSTRAINT [CK_CheckUpStatus] CHECK  (([CheckupStatus]=(8) OR [CheckupStatus]=(7)))
GO
ALTER TABLE [dbo].[Doctor] CHECK CONSTRAINT [CK_CheckUpStatus]
GO
ALTER TABLE [dbo].[Patient]  WITH CHECK ADD  CONSTRAINT [CHK_AliveStatus] CHECK  (([AliveStatus]=(10) OR [AliveStatus]=(9)))
GO
ALTER TABLE [dbo].[Patient] CHECK CONSTRAINT [CHK_AliveStatus]
GO
ALTER TABLE [dbo].[Person]  WITH NOCHECK ADD  CONSTRAINT [CK_Gender] CHECK  (([Gender]=(6) OR [Gender]=(5)))
GO
ALTER TABLE [dbo].[Person] CHECK CONSTRAINT [CK_Gender]
GO
USE [master]
GO
ALTER DATABASE [Healthcare_Management_System] SET  READ_WRITE 
GO
