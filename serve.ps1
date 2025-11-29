Add-Type -AssemblyName System.Net.HttpListener
$prefix = "http://localhost:8000/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Output "Listening on $prefix"
while ($listener.IsListening) {
    $context = $listener.GetContext()
    Start-Job -ScriptBlock {
        param($ctx, $root)
        try {
            $req = $ctx.Request
            $res = $ctx.Response
            $localPath = $req.Url.AbsolutePath.TrimStart('/').Replace('/','\\')
            if ([string]::IsNullOrEmpty($localPath)) { $localPath = 'index.html' }
            $filePath = Join-Path $root $localPath
            if (-not (Test-Path $filePath)) { $res.StatusCode = 404; $bytes = [System.Text.Encoding]::UTF8.GetBytes('Not Found') } else { $bytes = [System.IO.File]::ReadAllBytes($filePath); $res.ContentType = 'text/html' }
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes,0,$bytes.Length)
            $res.OutputStream.Close()
        } catch { }
    } -ArgumentList $context, $pwd | Out-Null
}
