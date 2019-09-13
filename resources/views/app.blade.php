<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no">

    <title>{{ config('app.name') }}</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>

<div id="root"></div>

<script src="{{ asset('js/app.js') }}"></script>

</body>
</html>
