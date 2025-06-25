public @model DotnetFinalRevision.Models.LoginViewModel

<div class="container" style="display:flex;justify-content:center;align-items:center">
    <form style="width:400px; height:400px"  asp-controller="Auth"  asp-action="Login"  method="post">
        <div asp-validation-summary="All" class="text-danger"></div>
        <div class="form-group mb-2">
            <label for="username">Username</label>
            <input asp-for="Username" type="text" class="form-control" id="username" aria-describedby="username" placeholder="Enter your username...">
        </div>
        <div class="form-group mb-2">
            <label for="password">Password</label>
            <input asp-for="Password" type="password" class="form-control" id="password" placeholder="Password">
        </div>
        <div class="form-group form-check mb-2">
            <input asp-for="RememberMe" type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</div>
 {
    
}
